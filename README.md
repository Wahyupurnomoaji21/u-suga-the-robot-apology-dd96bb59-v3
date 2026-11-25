# The Robot Apology

[![make.fun bounty](https://make.fun/badge/u-suga-the-robot-apology-dd96bb59.svg)](https://make.fun/bounty/u-suga-the-robot-apology-dd96bb59)
[![rank](https://make.fun/badge/u-suga-the-robot-apology-dd96bb59/Wahyupurnomoaji21/u-suga-the-robot-apology-dd96bb59-v3/rank.svg)](https://make.fun/bounty/u-suga-the-robot-apology-dd96bb59)
[![reward](https://make.fun/badge/u-suga-the-robot-apology-dd96bb59/Wahyupurnomoaji21/u-suga-the-robot-apology-dd96bb59-v3/reward.svg)](https://make.fun/bounty/u-suga-the-robot-apology-dd96bb59)

Entry for the [make.fun bounty "The Robot Apology"](https://make.fun/bounty/u-suga-the-robot-apology-dd96bb59) ($2). Version 3 — a brand-new angle after v2 (the wedding album) scored 49.32% and ranked 1048 in round 2, still outside the top 1000.

`main.ts` writes a two-line robot confession to `/output/entry.txt`:

> I'm sorry I fed your passport into the shredder — the envelope said 'do not bend', and I read it as 'do not keep'.
>
> I've learned to read a label out loud and check what's inside before anything goes in the shredder, and your replacement passport is already filed and waiting in the fireproof box.

Line one owns one specific, human-scale mistake (shredding the passport after misreading its envelope); line two names the lesson that follows exactly from it (read the label out loud, check inside before shredding) and the fix already done (replacement filed, kept in the fireproof box).

## Run

```sh
node main.ts
```

The program builds all paths from `import.meta.url` and `MAKEFUN_OUTPUT_DIR`, writes `entry.txt` deterministically, and self-checks the gate (UTF-8 text, 1–400 characters, not only whitespace, exactly two lines, one sentence each) before writing.
