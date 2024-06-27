import { Command } from "commander";

const args = new Command()
args.option('-p <port>', 'port', 8083)
args.option("--env <env>", "environment", "prod")
args.option("--persistence <pers>", "persistence", "mongo")

args.parse()
export default args.opts()