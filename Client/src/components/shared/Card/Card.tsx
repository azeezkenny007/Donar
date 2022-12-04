import React from "react";
import Image from "next/image";
import { Card, CardBody, CardFooter, Box, Button } from "@chakra-ui/react";
import TestImg from "../../../asset/robert-collins-tvc5imO5pXk-unsplash(1).jpg";
type Props = {};

const CustomCard = (props: Props) => {
  return (
    <Card bg="secondary" w="424px" height="640px">
      <CardBody>
        <Image src={TestImg} alt="card" width={200} height={200} />
      </CardBody>
      <CardFooter>
        <Button color="primary">Donate</Button>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
