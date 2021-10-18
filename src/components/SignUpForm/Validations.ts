const validations = {
  name: {
    custom: {
      isValid: (value: string) => isValidString(value),
      message: "Digite um nome válido",
    },
  },

  email: {
    custom: {
      isValid: (value: string) => validateEmail(value),
      message: "Digite um e-mail válido",
    },
  },

  cep: {
    custom: {
      isValid: (value: string) => value.length === 9,
      message: "Digite um CEP válido",
    },
  },

  city: {
    custom: {
      isValid: (value: string) => isValidString(value),
      message: "Digite uma cidade",
    },
  },

  neighborhood: {
    custom: {
      isValid: (value: string) => isValidString(value),
      message: "Digite um bairro",
    },
  },

  street: {
    custom: {
      isValid: (value: string) => isValidString(value),
      message: "Digite uma rua",
    },
  },

  state: {
    custom: {
      isValid: (value: string) => isValidString(value),
      message: "Selecione um estado",
    },
  },

  birthday: {
    custom: {
      isValid: (value: string) => isValidString(value),
      message: "Selecione uma data de aniversário",
    },
  },

  number: {
    custom: {
      isValid: (value: string) => isValidString(value),
      message: "Digite um número válido",
    },
  },
};

export default validations;

function isValidString(value: string) {
  return value || value?.trim();
}

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
