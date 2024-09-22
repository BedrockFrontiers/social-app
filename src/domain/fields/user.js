import { Prisma } from "@prisma/client";

export default async function getUserFields() {
  const userFields = Prisma.dmmf.datamodel.models
    .find(model => model.name === "User")
    .fields
    .filter(field => field.name !== "gid")
    .map(field => field.name);

  return userFields.reduce((acc, field) => {
    acc[field] = true;
    return acc;
  }, {});
}