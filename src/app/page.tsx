import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section
        className="py-24"
        style={{
          backgroundBlendMode: "soft-light",
          background: "url('/water.png') no-repeat, #FF514F",
        }}
      >
        <div
          className="container mx-auto px-4"
          style={{ color: "rgb(7 31 92)" }}
        >
          <h1 className="text-5xl font-bold mb-4">
            Round-Up for <em>Impact</em>
          </h1>
          <p className="text-lg mb-10">
            We are future of financial <em>freedom</em>.
          </p>
          <Link href="/signup" className="text-black hover:underline">
            <Button>Sign up for free!</Button>
          </Link>{" "}
          <Link href="/login" className="text-black hover:underline">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </section>

      {/* Who are we? Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10">Who are we?</h2>

          <p className="mb-8">
            We are a small team of passionate students who believe that everyone
            should have access to financial freedom.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Our mission</h3>
              <p>
                Our mission is to provide everyone with the tools to build a
                better future and access to pursue philanthropical efforts. We
                believe that everyone should have access to financial freedom,
                and we are here to help you achieve that.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Our vision</h3>
              <p>
                Our vision is to create a world where everyone has the ability
                to build a better future for themselves and their communities.
                We believe that everyone should have access to financial
                freedom, and we are here to help you achieve that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 pb-48" style={{ backgroundColor: "#94B0F8" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10">Key features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fas fa-rocket text-blue-500 text-3xl mb-4"></i>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "rgb(7 31 92)" }}
              >
                Passively invest in your future
              </h3>

              <p>
                We round up your purchases to the nearest dollar and invest the
                difference into your future or split it between your favorite
                charitable causes.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fas fa-rocket text-blue-500 text-3xl mb-4"></i>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "rgb(7 31 92)" }}
              >
                Accessible to everyone
              </h3>

              <p>
                We believe that everyone should have access to financial
                freedom. That's why we have no minimums or fees, and our web
                application is accessible to everyone.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fas fa-rocket text-blue-500 text-3xl mb-4"></i>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "rgb(7 31 92)" }}
              >
                Charitable giving
              </h3>

              <p>
                We believe in giving back. That's why we allow you to split your
                roundups between your future and your favorite charitable
                causes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <p className="text-center">
            &copy; 2024 Round-Up for Impact. |{" "}
            <a
              className="underline hover:opacity-75"
              href="https://github.com/EthanThatOneKid/rufi"
            >
              GitHub⭐
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
