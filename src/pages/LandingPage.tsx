import React from "react";
import { motion } from "framer-motion";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
      const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight">GoJobMatch</h1>
        <div className="flex gap-3">
          <Button variant="ghost" className="rounded-2xl" onClick={() => (navigate("/login"))}>Sign In</Button>
          <Button className="rounded-2xl" onClick={() => (navigate("/register"))}>Get Started</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Find the Right Job. <br /> Faster. Smarter.
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            GoJobMatch connects job seekers with the right opportunities and helps recruiters discover top candidates using intelligent matching and accurate recommendations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-2xl px-8" onClick={() => (navigate("/register"))}>Join Now</Button>
            <Button size="lg" variant="outline" className="rounded-2xl px-8" onClick={() => (navigate("/login"))}>Sign In</Button>
          </div>
          <p className="mt-4 text-sm text-gray-500">Free to join. Built for accuracy.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 rounded-2xl p-8 shadow-sm"
        >
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">For Job Seekers</h3>
              <ul className="mt-3 space-y-2 text-gray-600 text-sm">
                <li>• Get matched to relevant jobs</li>
                <li>• Increase interview chances</li>
                <li>• Save time on applications</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">For Recruiters</h3>
              <ul className="mt-3 space-y-2 text-gray-600 text-sm">
                <li>• Discover top candidates instantly</li>
                <li>• Reduce screening time</li>
                <li>• Hire with confidence</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold">How It Works</h3>
          <p className="mt-4 text-gray-600">Simple steps. Better matches.</p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg">1. Create Profile</h4>
                <p className="mt-3 text-sm text-gray-600">Add your skills, experience, and preferences.</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg">2. Smart Matching</h4>
                <p className="mt-3 text-sm text-gray-600">Our system ranks jobs and candidates by relevance.</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg">3. Connect & Apply</h4>
                <p className="mt-3 text-sm text-gray-600">Apply or connect with confidence and clarity.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold">Ready to Find Better Matches?</h3>
          <p className="mt-4 text-gray-600">Join GoJobMatch today and experience smarter hiring.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="rounded-2xl px-8" onClick={() => (navigate("/register"))}>Create Account</Button>
            <Button size="lg" variant="outline" className="rounded-2xl px-8" onClick={() => (navigate("/login"))}>Sign In</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 md:px-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GoJobMatch. All rights reserved.
      </footer>
    </div>
  );
}
