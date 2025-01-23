import { runMigration } from '../src/lib/supabase'

async function main() {
  try {
    await runMigration()
    console.log('Migration completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

main()
