import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Tabs, Tab } from "@nextui-org/react";

const features = [
  "3 Document Templates",
  "Unlimited Downloads",
  "Unlimited Revisions",
  "Upload & Share Documents",
];

const plans = [
  {
    title: "Free",
    price: 0,
    button: "Get started with Free",
    features: features,
  },
  {
    title: "Pro",
    price: 99,
    button: "Get started with Pro",
    features: features,
  },
  {
    title: "Business",
    price: 199,
    button: "Get started with Business",
    features: features,
  },
];

export default function Pricing() {
  return (
    <main className="flex flex-col items-center justify-center h-[calc(100vh-60px)] md:h-[calc(100vh-250px)]">
      <h1 className="text-center text-[40px] md:text-[56px] my-2 md:my-12 font-extrabold">
        Pricing
      </h1>
      <div className="w-full px-2">
        <div className="flex flex-col lg:hidden items-center">
          <Tabs aria-label="Options">
            {plans.map((plan, index) => (
              <Tab key={index} title={plan.title}>
                <Card
                  key={plan.title}
                  style={{ boxShadow: "none" }}
                  className={`max-w-[300px] w-[240px] p-4 ${
                    index === 1 ? "bg-[#266FD5] text-white" : "bg-[#F5F5F5]"
                  }`}
                >
                  <CardHeader className="block">
                    <p
                      className={`text-[24px] ${
                        index === 1 ? "text-white" : "text-[#555555]"
                      }`}
                    >
                      {plan.title}
                    </p>
                    <h1
                      className={`font-black text-[70px] ${
                        index === 1 ? "" : ""
                      }`}
                    >
                      ${plan.price}
                    </h1>
                  </CardHeader>
                  <CardBody>
                    {plan.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className="flex items-center text-[12px] gap-2">
                        <IoCheckmarkCircleOutline className="w-4 h-4 text-green-400" />
                        {feature}
                      </span>
                    ))}
                  </CardBody>
                  <CardFooter>
                    <Button title={plan.button} />
                  </CardFooter>
                </Card>
              </Tab>
            ))}
          </Tabs>
        </div>

        <div className="hidden lg:flex flew-row items-center justify-center gap-10">
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
                    index === 1 ? "text-white" : "text-[#555555]"
                  }`}
                >
                  {plan.title}
                </p>
                <h1
                  className={`font-black text-[70px] ${index === 1 ? "" : ""}`}
                >
                  ${plan.price}
                </h1>
              </CardHeader>
              <CardBody>
                {plan.features.map((feature, featureIndex) => (
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
      </div>
    </main>
  );
}
