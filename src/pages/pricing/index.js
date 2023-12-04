import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const plans = [
  { title: "Free", price: 0, button: "Get started with Free" },
  { title: "Pro", price: 99, button: "Get started with Pro" },
  { title: "Business", price: 199, button: "Get started with Busniess" },
];

const features = [
  "3 Document Templates",
  "Unlimited Downloads",
  "Unlimited Revisions",
  "Upload & Share Documents",
];

export default function Pricing() {
  return (
    <section className="flex flex-col items-center justify-center"
    style={{
        height: "calc(100vh - 250px)",
      }}
    >
      <h1 className="text-center text-[56px] my-12 font-extrabold">Pricing</h1>
      <div className="flex items-center justify-center gap-10">
        {plans.map((plan, index) => (
          <Card
            key={plan.title}
            style={{ boxShadow: "none" }}
            className={`max-w-[400px] w-[300px] p-4 ${
              index === 1 ? "bg-[#266FD5] text-white" : "bg-[#F5F5F5]"
            }`}
          >
            <CardHeader className="block">
              <p
                className={`text-[24px] ${
                  index === 1 ? "text-white" : "text-[#555555] "
                }`}
              >
                {plan.title}
              </p>
              <h1 className={`font-black text-[70px] ${index === 1 ? "" : ""}`}>
                ${plan.price}
              </h1>
            </CardHeader>
            <CardBody>
              {features.map((feature, featureIndex) => (
                <span key={featureIndex} className="flex items-center">
                  <IoCheckmarkCircleOutline className="w-6 h-6 text-green-400" />
                  {feature}
                </span>
              ))}
            </CardBody>
            <CardFooter>
              <Button title={plan.button} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
