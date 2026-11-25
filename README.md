# makefun-news-1125

[![Competition](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125)
[![Rank](https://make.fun/badge/news-image-20261125/monicazhy949/makefun-news-1125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard)
[![Reward](https://make.fun/badge/news-image-20261125/monicazhy949/makefun-news-1125/reward.svg)](https://make.fun/bounty/news-image-20261125)

A 1024×1024 newspaper front page summing up the world news of **Wednesday,
25 November 2026**, drawn from real, sourced stories of the day:

1. **Houthi drone hits Riyadh's tallest tower again** — second strike on the
   385-metre PIF Tower in five days wounds 11, two critically, Saudi civil
   defence says.
2. **Shenzhou-24 lifts off with first Pakistani in orbit** — China launches
   its Shenzhou-24 crew at 08:18 Beijing time.
3. **Asian stocks slide as new US tariffs loom** — Korea −5.3%, Taiwan −5.1%,
   Nikkei −2.9% as Washington readies a probe of 16 trading partners.
4. **Shanghai party chief probed; city pledges loyalty** — Chen Jining is the
   fourth Politburo member investigated since 2025.
5. **Russian strike kills two in Odesa; Kyiv hit** — drones strike the capital
   overnight.
6. **Gas blast at Hanoi restaurant kills six** — explosion at a hot-pot
   restaurant injures 10.

## Sources (all reported 25 November 2026)

- Reuters — world news summary; Odesa strike; markets; Chen Jining probe;
  Shenzhou-24 live coverage
- AFP (via SCMP, CNA, Dawn, ABS-CBN) — Riyadh PIF Tower strike, 11 wounded
- Xinhua / ECNS — Chen Jining investigation; Shenzhou-24 launch, 08:18
  Beijing time
- Saudi Press Agency / Saudi Civil Defense — 11 injured in the Riyadh strike
- Qatar Tribune — Hanoi restaurant explosion, 6 killed, 10 injured

## Usage

```bash
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) validates the bundled `entry.png`
— whole PNG, at most 1 MiB and 1024×1024 — and copies it byte for byte to
`$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output/entry.png`). It makes no
network calls, so two runs always write identical bytes. The image itself was
drawn from scratch for this entry (Pillow, DejaVu fonts): a newspaper front
page with a hand-drawn pictogram per story, not a photograph or a clip from
any other source.

## Bounty

- Bounty page: https://make.fun/bounty/news-image-20261125
- Leaderboard: https://make.fun/bounty/news-image-20261125/leaderboard
