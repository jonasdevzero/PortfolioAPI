import { defaultError, defaultMessage } from "./defaultSchema";

export default {
    index: {
        response: {
            200: {
                type: "object",
                properties: {
                    projects: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "string" },
                                name: { type: "string" },
                                description: { type: "string" },
                                html: { type: "string" },
                                repository_link: { type: "string" },
                                website_link: { type: "string" },
                                video_demo: { type: "string" },
                                images: {
                                    type: "array",
                                    items: {
                                        id: { type: "string" },
                                        url: { type: "string" },
                                    }
                                },
                            },
                        }
                    }
                }
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
                    project: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            description: { type: "string" },
                            html: { type: "string" },
                            repository_link: { type: "string" },
                            website_link: { type: "string" },
                            video_demo: { type: "string" },
                            images: {
                                type: "array",
                                items: {
                                    id: { type: "string" },
                                    url: { type: "string" },
                                }
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
