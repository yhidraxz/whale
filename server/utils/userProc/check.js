async function checkIfExists(model, name, newValue) {
  const exists = await model.findOne({ [name]: newValue });

  if (exists) {
    return true;
  }
  if (!exists) return false;
}

export { checkIfExists };
