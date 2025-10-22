"use client"

import { toggleRole } from "@/actions/auth/toggleRole";
import { Button } from "@/components/ui/button";
import React from "react";

function Toggle () {

  return (
    <div>
      <Button onClick={toggleRole}>Toggle Role</Button>
    </div>
  );
};

export default Toggle;
