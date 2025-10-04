import { defineConfig } from 'orval';

export default defineConfig({
  'noted-api': {
    input: {
      target: '../backend/api/openapi.yaml',
    },
    output: {
      mode: 'tags-split',
      target: './src/api/generated',
      schemas: './src/api/generated/model',
      client: 'react-query',
      mock: true,
      prettier: true,
      indexFiles: true, // Generate index files for cleaner imports
      tsconfig: './tsconfig.app.json', // Use the app TypeScript config
      override: {
        mutator: {
          path: './src/api/mutator/custom-instance.ts',
          name: 'customInstance'
        },
        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
          shouldExportMutatorHooks: true,
          shouldExportHttpClient: true,
        }
      }
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write'
    }
  }
});
