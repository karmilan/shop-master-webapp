import { v4 as uuid } from "uuid";

const GenerateUniqueId = (prefix) => {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  return `${prefix}-${small_id}`;
};

export default GenerateUniqueId;
