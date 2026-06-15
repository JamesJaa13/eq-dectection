#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <MPU6050.h>
#include <WiFiUdp.h>
#include <NTPClient.h>

// WiFi config   
const char* ssid = "KMITL-WiFi";
const char* password = "";

// Backend URL
const char* serverName = "http://172.16.2.213:3001/sensor"; // เปลี่ยนเป็น IP backend จริง

// MPU6050 object
MPU6050 mpu;

// NTP Client config
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 7 * 3600, 60000); // GMT+7, update ทุก 60 วิ

// LED Pins
const int LED1 = 12;
const int LED2 = 14;
const int LED3 = 27;

// LDR Pins (3 ตัว)
const int LDR1_PIN = 32; // สำหรับ LED1
const int LDR2_PIN = 33; // สำหรับ LED2
const int LDR3_PIN = 35; // สำหรับ LED3

const int LDR_THRESHOLD = 2000; // ปรับตามสภาพแสงจริง

void setup() {
  Serial.begin(115200);
  Wire.begin();

  // ตั้งค่า LED
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
  digitalWrite(LED1, LOW);
  digitalWrite(LED2, LOW);
  digitalWrite(LED3, LOW);

  // เริ่มต้น MPU6050
  Serial.println("Initializing MPU6050...");
  mpu.initialize();
  if (mpu.testConnection()) {
    Serial.println("MPU6050 connection successful");
  } else {
    Serial.println("MPU6050 connection failed");
    while (1);
  }

  // เชื่อมต่อ WiFi
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");

  // เริ่มต้น NTP client
  timeClient.begin();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // อ่านค่า LDR แยก 3 ตัว
    int ldr1 = analogRead(LDR1_PIN);
    int ldr2 = analogRead(LDR2_PIN);
    int ldr3 = analogRead(LDR3_PIN);

    Serial.println("LDR1: " + String(ldr1));
    Serial.println("LDR2: " + String(ldr2));
    Serial.println("LDR3: " + String(ldr3));

    // อัปเดตเวลาจาก NTP
    timeClient.update();

    // อ่านข้อมูลจาก MPU6050
    int16_t ax, ay, az;
    int16_t gx, gy, gz;
    mpu.getAcceleration(&ax, &ay, &az);
    mpu.getRotation(&gx, &gy, &gz);

    float accel_x = ax / 16384.0;
    float accel_y = ay / 16384.0;
    float accel_z = az / 16384.0;

    float gyro_x = gx / 131.0;
    float gyro_y = gy / 131.0;
    float gyro_z = gz / 131.0;

    float accTotal = sqrt(accel_x * accel_x + accel_y * accel_y + accel_z * accel_z);
    bool vibrationDetected = (accTotal > 1.13);

    // --------------------------
    // LED + LDR Logic (แยกแต่ละดวง)
    // --------------------------
    
    // LED1 -> LDR1
    if (ldr1 < LDR_THRESHOLD) {
      digitalWrite(LED1, HIGH);
    } else {
      digitalWrite(LED1, LOW);
    }

    // LED2 -> LDR2
    if (ldr2 < LDR_THRESHOLD) {
      digitalWrite(LED2, HIGH);
    } else {
      digitalWrite(LED2, LOW);
    }

    // LED3 -> LDR3
    if (ldr3 < LDR_THRESHOLD) {
      digitalWrite(LED3, HIGH);
    } else {
      digitalWrite(LED3, LOW);
    }


    // --------------------------
    // กระพริบไฟเมื่อมีการสั่น
    // --------------------------
    if (vibrationDetected) {
      for (int i = 0; i < 5; i++) {
        digitalWrite(LED1, HIGH);
        digitalWrite(LED2, HIGH);
        digitalWrite(LED3, HIGH);
        delay(200);
        digitalWrite(LED1, LOW);
        digitalWrite(LED2, LOW);
        digitalWrite(LED3, LOW);
        delay(200);
      }
    }

    // --------------------------
    // ส่งข้อมูล MPU6050 ไป backend
    // --------------------------
    StaticJsonDocument<256> jsonDoc;
    jsonDoc["accel_x"] = accel_x;
    jsonDoc["accel_y"] = accel_y;
    jsonDoc["accel_z"] = accel_z;
    jsonDoc["gyro_x"] = gyro_x;
    jsonDoc["gyro_y"] = gyro_y;
    jsonDoc["gyro_z"] = gyro_z;
    jsonDoc["accTotal"] = accTotal;
    jsonDoc["vibrationDetected"] = vibrationDetected;

    String requestBody;
    serializeJson(jsonDoc, requestBody);

    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(requestBody);
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.printf("HTTP Response code: %d\n", httpResponseCode);
      Serial.println("Response: " + response);
    } else {
      Serial.printf("Error code: %d\n", httpResponseCode);
    }
    http.end();

  } else {
    Serial.println("WiFi Disconnected");
  }

  delay(10000); // ส่งข้อมูลทุก 10 วินาที
}
