import { MultiSelect } from "@/components/ui/multi-select";
import { useWorkflowParametersState } from "../../useWorkflowParametersState";

type Props = {
  availableOutputParameters: Array<string>;
  parameters: Array<string>;
  onParametersChange: (parameters: Array<string>) => void;
};

function TaskNodeParametersPanel({
  availableOutputParameters,
  parameters,
  onParametersChange,
}: Props) {
  const [workflowParameters] = useWorkflowParametersState();
  const keys = workflowParameters
    .map((parameter) => parameter.key)
    .concat(availableOutputParameters);

  const options = keys.map((key) => {
    return {
      label: key,
      value: key,
    };
  });

  return (
    <div className="space-y-1">
      <header className="flex gap-2">
        <h1 className="text-xs text-slate-300">Parameters</h1>
      </header>
      <MultiSelect
        value={parameters}
        onValueChange={onParametersChange}
        options={options}
        maxCount={50}
      />
    </div>
  );
}

export { TaskNodeParametersPanel };
