import * as fs from "fs"
import { handler } from "../../src/main"

const event = fs.readFileSync("/work/tests/cloudfront_event.json", 'utf-8')
const result = handler(JSON.parse(event))
console.log(result)