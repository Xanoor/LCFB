// types.ts
export interface Command {
    name: string;
    type: string;
    description: string;
    long_description: string;
    syntax: string;
    details: string[];
    options?: { [key: string]: string | undefined };
}
