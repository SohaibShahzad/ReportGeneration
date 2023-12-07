import { Onboarding } from "@/components/gettingstarted/onboarding";
import { DocumentPractice } from "@/components/gettingstarted/documentPractice";
import { ParseTemplate } from "@/components/gettingstarted/parseTemplate";
import { useSession, getSession } from "next-auth/react";
import { useState } from "react";

export default function GettingStarted() {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState("onboarding");
  const [templateData, setTemplateData] = useState(
    "Today is [DAY], I feel [EMOTION], and my favourite is a [ANIMAL]."
  );

  const handleOnboardingDone = () => {
    setCurrentStep("documentPractice");
  };

  const handlePracticeDone = (template) => {
    setTemplateData(template);
    setCurrentStep("parseTemplate");
  };

  const handleGoBack = () => {
    if (currentStep === "parseTemplate") {
      setCurrentStep("documentPractice");
    } else if (currentStep === "documentPractice") {
      setCurrentStep("onboarding");
    }
  };

  switch (currentStep) {
    case "onboarding":
      return (
        <Onboarding onCompletion={handleOnboardingDone} user={session?.user} />
      );
    case "documentPractice":
      return (
        <DocumentPractice
          template={templateData}
          setTemplate={setTemplateData}
          onGoBack={handleGoBack}
          onCompletion={handlePracticeDone}
        />
      );

    case "parseTemplate":
      return <ParseTemplate template={templateData} onGoBack={handleGoBack} />;
    default:
      return <div>Invalid step</div>;
  }
}


export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
