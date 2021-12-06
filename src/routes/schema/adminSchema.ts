import { defaultError, defaultMessage } from "./defaultSchema";

export default {
    index: {
        response: {
            200: {
                type: "object",
                properties: {
                    admins: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "string" },
                                username: { type: "string" },
                                role: { type: "number" },
                                activated: { type: "boolean", }
                            },
                        },
                    },
                },
            },
            '4xx': defaultError,
            500: defaultError,
        }
    },

    create: {
        response: {
            201: {
                type: "object",
                properties: {
                    token: { type: "string" },
                },
            },
            '4xx': defaultError,
            500: defaultError,
        }
    },

    login: {
        response: {
            200: {
                type: "object",
                properties: {
                    token: { type: "string" },
                },
            },
            '4xx': defaultError,
            500: defaultError,
        }
    },
    
    auth: {
        response: {
            200: {
                type: "object",
                properties: {
                    admin: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            username: { type: "string" },
                            role: { type: "number" },
                        }
                    }
                }
            },
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

    updateActivity: {
        response: {
            200: defaultMessage,
            '4xx': defaultError,
            500: defaultError,
        }
    },
}
