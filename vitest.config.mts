import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["**/tests/*.spec.ts"],
        coverage: {
            provider: "istanbul",
            reportsDirectory: "coverage/",
            reporter: ["lcov", 'text'],
            include: ["src/"],
        },
    }
});