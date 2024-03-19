import { Button } from "@/components/ui/button";
import Link from "next/link";

import React from "react";

const Home = () => {
  return (
    <div>
      This is landing page of the Genius AI (unprotected)
      <div>
        <Link href="/sign-in">
          <Button>Log in</Button>
        </Link>
      </div>
      <div>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
