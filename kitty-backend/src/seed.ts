/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { hash } from 'argon2';
import { ADMIN, USER } from './constants/roles';
import { PrismaClient } from '@prisma/client';

const numberOfUsers = 10;
const numberOfAdmins = 2;
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');
  /// --------- Users ---------------
  for (let i = 0; i <= numberOfUsers; i++) {
    await prisma.kittyChatter.create({
      data: {
        username: `KittyChatterUser_${i}`,
        email: `kittychatteruser-${i}@example.com`,
        password: await hash('userPassword123', { hashLength: 24 }),
        role: USER,
        isAccountActivated: true,
        customBubbleColor: `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')}`,
      },
    });
  }
  /// --------- Admins ---------------
  for (let i = 0; i <= numberOfAdmins; i++) {
    await prisma.kittyChatter.create({
      data: {
        username: `KittyChatterAdmin_${i}`,
        email: `kittychatteradmin-${i}@example.com`,
        password: await hash('adminPassword123', { hashLength: 24 }),
        role: ADMIN,
        isAccountActivated: true,
        customBubbleColor: `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')}`,
      },
    });
  }
  console.log('Seeding completed');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
