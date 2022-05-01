import { Orchestrator } from "@holochain/tryorama";

import zome_0_entry_def_0 from './dna_0/zome_0/entry_def_0';

let orchestrator: Orchestrator<any>;

orchestrator = new Orchestrator();
zome_0_entry_def_0(orchestrator);
orchestrator.run();



