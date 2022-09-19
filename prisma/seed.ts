import client from "../src/dbStrategy/database";

async function main() {
  await client.terms.createMany({
    data: [
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 4 },
      { number: 5 },
      { number: 6 },
    ],
    skipDuplicates: true,
  });

  await client.categories.createMany({
    data: [{ name: "Projeto" }, { name: "Prática" }, { name: "Recuperação" }],
    skipDuplicates: true,
  });

  await client.teachers.createMany({
    data: [{ name: "André" }, { name: "Bruna" }],
    skipDuplicates: true,
  });

  await client.disciplines.createMany({
    data: [
      { name: "HTML", termId: 1 },
      { name: "JavaScript", termId: 2 },
      { name: "React", termId: 3 },
      { name: "SQL", termId: 1 },
      { name: "Typescript", termId: 2 },
      { name: "NoSQL", termId: 3 },
    ],
    skipDuplicates: true,
  });

  await client.teachersDisciplines.createMany({
    data: [
      { teacherId: 1, disciplineId: 1 },
      { teacherId: 1, disciplineId: 2 },
      { teacherId: 1, disciplineId: 3 },
      { teacherId: 2, disciplineId: 4 },
      { teacherId: 2, disciplineId: 5 },
      { teacherId: 2, disciplineId: 6 },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    client.$disconnect();
});