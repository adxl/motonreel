const faker = require("@faker-js/faker").faker;
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const jwt = require("../../lib/jwt");

/* USERS FIXTURES */
async function generateFixtures(db) {
  const salt = await bcrypt.genSalt(10);

  for (let i = 0; i < 10; i++) {
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      isAdmin: true,
      disponibility: faker.datatype.boolean(),
    };

    user.token = await jwt.createToken(user);
    user.password = await bcrypt.hash(faker.internet.password(), salt);

    await db.users.create(user);
  }

  for (let i = 0; i < 50; i++) {
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      isAdmin: false,
      disponibility: false,
    };

    user.token = await jwt.createToken(user);
    user.password = await bcrypt.hash(faker.internet.password(), salt);

    await db.users.create(user);
  }

  /* SALON FIXTURES */

  for (let i = 0; i < 10; i++) {
    await db.salon.create({
      name: faker.music.songName(),
      userSize: faker.datatype.number({ min: 15, max: 75 }),
    });
  }

  /* COMMREQUEST STATUSES FIXTURES */

  await db.CommRequestStatus.destroy({
    where: {
      [Op.or]: [
        { id: "a57014e4-19bd-471c-979a-1c77cc16ad4a" },
        { id: "23fb3b0e-c5bd-4dc3-b186-60be4987fd7c" },
        { id: "342fc969-aa8f-486c-88b4-821042a01640" },
        { id: "770fbb69-658a-4dc9-b5ed-26ae596793a7" },
      ],
    },
  });

  await db.CommRequestStatus.create({
    id: "a57014e4-19bd-471c-979a-1c77cc16ad4a",
    name: "En attente",
  });

  await db.CommRequestStatus.create({
    id: "23fb3b0e-c5bd-4dc3-b186-60be4987fd7c",
    name: "Acceptée",
  });

  await db.CommRequestStatus.create({
    id: "342fc969-aa8f-486c-88b4-821042a01640",
    name: "Refusée",
  });

  await db.CommRequestStatus.create({
    id: "770fbb69-658a-4dc9-b5ed-26ae596793a7",
    name: "Terminée",
  });

  /* RENDEZVOUSTYPE FIXTURES */

  await db.rendezVousType.destroy({
    where: {
      [Op.or]: [
        { id: "a3b548d9-f83a-4738-ace7-d104671b07c3" },
        { id: "9f937831-47ee-4a22-9249-cbacf9d1f3f6" },
        { id: "74e2746c-48e3-4caa-bccf-a0be5b1107be" },
        { id: "fb0c3373-9ff7-4290-9bac-cac5503108ea" },
      ],
    },
  });

  await db.rendezVousType.create({
    id: "a3b548d9-f83a-4738-ace7-d104671b07c3",
    name: "Classique",
  });

  await db.rendezVousType.create({
    id: "9f937831-47ee-4a22-9249-cbacf9d1f3f6",
    name: "Routier",
  });

  await db.rendezVousType.create({
    id: "74e2746c-48e3-4caa-bccf-a0be5b1107be",
    name: "Tout-terrains",
  });

  await db.rendezVousType.create({
    id: "fb0c3373-9ff7-4290-9bac-cac5503108ea",
    name: "Sportif",
  });
}

module.exports = generateFixtures;
