import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ClientKafka, ClientsModule } from '@nestjs/microservices';
import { Order } from './entities/order.entity';
import { Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092']
          },
          consumer: {
            groupId: 'my-group-producer'
          }
        }
      }
    ])
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaService: ClientKafka) => {
        return kafkaService.connect();
      },
      inject: ['KAFKA_SERVICE']
    },
  ]
})

export class OrdersModule {}
