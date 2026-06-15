import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'sensor_data' })
export class SensorData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  accel_x: number;

  @Column('float')
  accel_y: number;

  @Column('float')
  accel_z: number;

  @Column('float')
  gyro_x: number;

  @Column('float')
  gyro_y: number;

  @Column('float')
  gyro_z: number;

  @Column('float')
  accTotal: number;

  @Column('boolean')
  vibrationDetected: boolean;

  @CreateDateColumn({ type: 'timestamp' })  // ให้ DB กำหนดเวลาบันทึกเอง
  timestamp: Date;
}
