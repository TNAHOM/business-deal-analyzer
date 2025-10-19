export const OpportunityResponseSchema = {
    name: "Opportunity Analysis Report",
    schema: {
        type: "object",
        properties: {
            summary: {
                type: "string",
                description: "A brief summary of the opportunity analysis",
            },
            opportunity_score: {
                type: "integer",
                description: "Overall opportunity score",
            },
            overall_outlook: {
                type: "string",
                description: "General outlook based on the analysis",
            },
            items: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        potential: { type: "string" },
                        description: { type: "string" },
                        probability: { type: "integer" },
                        recommended_actions: { type: "string" },
                    },
                    required: [
                        "title",
                        "potential",
                        "description",
                        "probability",
                        "recommended_actions",
                    ],
                    additionalProperties: false,
                },
                description: "List of identified opportunities",
            },
        },
        required: ["summary", "opportunity_score", "overall_outlook", "items"],
        additionalProperties: false,
    },
    strict: true,
};
