import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ✅ import
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorDataModule } from './sensor-data-module'; // เปลี่ยนตามชื่อไฟล์จริงของคุณ

@Module({
  imports: [
    ConfigModule.forRoot(), // ✅ เพิ่มตรงนี้เพื่อโหลด .env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3360,
      username: 'user',
      password: 'userpassword',
      database: 'mydatabase',
      autoLoadEntities: true,
      synchronize: false,
    }),
    SensorDataModule,
  ],
})
export class AppModule {}
