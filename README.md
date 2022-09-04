# vatsim_wrapper

[![CI](https://github.com/Celeo/vatsim_wrapper/workflows/CI/badge.svg?branch=master)](https://github.com/Celeo/vatsim_wrapper/actions?query=workflow%3ACI)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Runtime](https://img.shields.io/badge/runtime-Deno-orange)](https://deno.land/)

![module version](https://shield.deno.dev/x/vatsim_wrapper)

VATSIM API wrapper in TypeScript (Deno).

## Using

1. Create a new JS/TS file, i.e. `main.ts`.
1. Add an import, i.e.

```ts
import { getStatsUrl } from "https://deno.land/x/vatsim_wrapper/mod.ts";

console.log(getStatsUrl(1234567890));
```

1. Run with `deno run <your_file_name>`

```sh
$ deno run main.ts
> https://stats.vatsim.net/stats/1234567890
```

## License

- Main library under MIT ([LICENSE](LICENSE)).
- Supporting libraries in use under their respective licenses.
- Airport data from <https://www.partow.net/miscellaneous/airportdatabase/>.

## Contributing

Please feel free to contribute. Please open an issue first (or comment on an existing one) so that I know that you want to add/change something.

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you shall be licensed as above, without any additional terms or conditions.
