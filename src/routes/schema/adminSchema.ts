import { defaultError, defaultMessage } from "./defaultSchema";

export default {
    index: {
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        username: { type: "string" },
                        role: { type: "number" },
                    },
                }
            },
            '4xx': defaultError,
            500: defaultError,
        }
    },

    create: {
        response: {
            200: defaultMessage,
            '4xx': defaultError,
            500: defaultError,
        }
    },

    update: {
        response: {
            200: defaultMessage,
            '4xx': defaultError,
            500: defaultError,
        }
    },
}
