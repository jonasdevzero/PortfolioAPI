import { defaultError, defaultMessage } from "./defaultSchema";

export default {
    index: {
        response: {
            200: {
                type: "object",
                properties: {
                    skills: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "string" },
                                name: { type: "string" },
                                type: { type: "string" },
                                description: { type: "string" },
                                icon_url: { type: "string" },
                                more_link: { type: "string" },
                            },
                        }
                    }
                }
            },
            '4xx': defaultError,
            500: defaultError,
        }
    },

    create: {
        response: {
            201: defaultMessage,
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

    delete: {
        response: {
            200: defaultMessage,
            '4xx': defaultError,
            500: defaultError,
        }
    },

}