//frontend 폴더 변경이 아닐경우 빌드를 무시하도록
import { execSync } from "child_process";

const changedFiles = execSync("git diff --name-only HEAD HEAD~1").toString();

const shouldBuild = changedFiles
  .split("\n")
  .some((file) => file.startsWith("src/frontend/"));

if (!shouldBuild) {
  process.exit(0);
} else {
}
