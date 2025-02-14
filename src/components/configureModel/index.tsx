import React from "react";
import { Select, Divider } from "@ltopx/lx-ui";
import { useLLMStore } from "@/hooks/useLLM";
import OpenAI from "./openai";
import Azure from "./azure";
import OpenRouter from "./openRouter";

const renderLabel = (item: any) => {
  return (
    <div className="flex gap-2 items-center">
      {item.ico}
      {item.label}
    </div>
  );
};

export default function ConfigureModel() {
  const [model, setModel] = React.useState<string>("");
  const [openai, azure, openRouter] = useLLMStore((state) => [
    state.openai,
    state.azure,
    state.openRouter,
  ]);

  const LLMOptions = React.useMemo(
    () => [openai, azure, openRouter],
    [openai, azure, openRouter]
  );

  const findLLM = LLMOptions.find((item) => item.value === model);

  React.useEffect(() => {
    setModel(LLMOptions[0].value);
  }, []);

  return (
    <>
      <Select
        className="w-full"
        size="lg"
        options={LLMOptions}
        renderLabel={renderLabel}
        value={model}
        onChange={setModel}
      />
      <Divider>{findLLM?.ico_big}</Divider>
      {model === LLMOptions[0].value && <OpenAI />}
      {model === LLMOptions[1].value && <Azure />}
      {model === LLMOptions[2].value && <OpenRouter />}
    </>
  );
}
