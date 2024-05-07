import { getClient } from "@/api/AxiosClient";
import { StepApiResponse } from "@/api/types";
import { cn } from "@/util/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../constants";
import { CheckboxIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useCredentialGetter } from "@/hooks/useCredentialGetter";

type Props = {
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
};

function StepNavigation({ activeIndex, onActiveIndexChange }: Props) {
  const { taskId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const credentialGetter = useCredentialGetter();

  const {
    data: steps,
    isError,
    error,
  } = useQuery<Array<StepApiResponse>>({
    queryKey: ["task", taskId, "steps", page],
    queryFn: async () => {
      const client = await getClient(credentialGetter);
      return client
        .get(`/tasks/${taskId}/steps`, {
          params: {
            page,
            page_size: PAGE_SIZE,
          },
        })
        .then((response) => response.data);
    },
  });

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!steps) {
    return <div>No steps found</div>;
  }

  return (
    <nav className="flex flex-col gap-4">
      {steps.map((step, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            className={cn(
              "flex items-center px-6 py-2 hover:bg-primary-foreground rounded-2xl cursor-pointer",
              {
                "bg-primary-foreground": isActive,
              },
            )}
            key={step.step_id}
            onClick={() => {
              onActiveIndexChange(index);
            }}
          >
            {step.status === "completed" && (
              <CheckboxIcon className="w-6 h-6 mr-2 text-green-500" />
            )}
            {step.status === "failed" && (
              <CrossCircledIcon className="w-6 h-6 mr-2 text-red-500" />
            )}
            <span>
              {step.retry_index > 0
                ? `Step ${step.order + 1} ( Retry ${step.retry_index} )`
                : `Step ${step.order + 1}`}
            </span>
          </div>
        );
      })}
    </nav>
  );
}

export { StepNavigation };
