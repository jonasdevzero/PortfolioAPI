import { defaultError, defaultMessage } from "./defaultSchema";

export default {
    index: {
        response: {
            200: {
                type: "object",
                properties: {
                    messages: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "string" },
                                email: { type: "string" },
                                text: { type: "string" },
                                sent_at: { type: "string" },
                                viewed: { type: "boolean" },
                            },
                        },
                    },
                },
            },
            '4xx': defaultError,
            500: defaultError,
        }
    },

    show: {
        response: {
            200: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    email: { type: "string" },
                    text: { type: "string" },
                    sent_at: { type: "string" },
                    viewed: { type: "boolean" },
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
}