import { DialogProps } from "element-plus";
import { BasePayload } from "@/composables/usePayload";
import { Middleware } from "@wsvaio/utils";
declare global {
  type VModelProvider = {
    actionMap: Map<string, Set<Middleware<VModelProvider>>>;
    slotMap: Map<string, Record<string, Function>>;
    dialog: Writeable<Partial<DialogProps>>;
    payload: {
      $slot: string;
      $show: boolean;
      $footable: boolean;
    } & BasePayload;
    use: (
      slotName: string,
    ) => (...names: string[]) => (...middlewares: Middleware<VModelProvider>[]) => void;
    action: (payloadOptions?: string | Partial<VModelProvider["payload"]>) => Promise<void>;
    clear: () => boolean;
    close: () => boolean;
  };
}

export {};
