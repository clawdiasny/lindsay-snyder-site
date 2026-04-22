# Website.md

## Website Workflow

This file is the source of truth for how website work should be handled for the Lindsay Snyder site.

### Local working structure
- The local working website files live in `ws/`.
- Treat `ws/` as the editable source folder for website changes.
- Do not treat the repo root copy as the primary editing location when doing website work.

### Publish workflow
- Local edits happen in `ws/`.
- When committing website changes to GitHub, publish the **contents of `ws/` into the repository root**.
- Do not publish the `ws/` folder itself as a nested website directory on GitHub.
- In other words, sync `ws/*` to the repo root before or during publish.

### Deployment path
- Workflow path: **you -> local (`ws/`) -> GitHub repo root -> Cloudflare**
- Cloudflare should receive the site from the GitHub root deployment structure, not from a nested `ws/` folder.

### Safety check before pushing
Before pushing website updates:
1. Confirm the intended edits exist in `ws/`.
2. Sync the contents of `ws/` to the repo root.
3. Commit the root website files that reflect those `ws/` changes.
4. Push to GitHub.
5. Verify the expected files are in the repo root, not only in `ws/`.

### Notes
- If there is ever a mismatch between `ws/` and the repo root, `ws/` is the intended source for website edits.
- Be careful not to push unrelated workspace files when publishing website changes.
