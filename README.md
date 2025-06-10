# Blog Aggregator TS

A TypeScript-based blog/RSS aggregator CLI tool.

## Initial Project Configuration

### 1. Install Dependencies

Run the following command to install all required dependencies:

```sh
npm install
```

### 2. Configure the Project

All configuration is managed via the `.gatorconfig.json` file located in the `home` directory.

#### Example `~/.gatorconfig.json`:
```json
{
  "db_url": "postgres://user:password@localhost:5432/dbname",
  "current_user_name": "your-username"
}
```

- **db_url**: The connection string for your PostgreSQL database.
- **current_user_name**: The username to use as the current user in the application.

### 3. Running the Project

To start the CLI, use:

```sh
npm start
```

Or, if you want to run a specific command (e.g., aggregate feeds):

```sh
npm run start <cmd> ...<arguments>
```

Replace `agg 10m` with any command and arguments you want to use.

## Available Commands

- `login`
- `register`
- `reset`
- `agg <interval>`
- `addfeed <name> <url>`
- `feeds`
- `follow <url>`
- `unfollow <url>`
- `following`
- `browse`
