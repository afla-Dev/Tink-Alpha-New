import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Zap, Play, Check, Star, Trophy, QrCode, Volume2, Award, BookOpen, Target, HelpCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Footer from "@/components/Footer";

const Circuit = () => {
  const [currentSection, setCurrentSection] = useState<'intro' | 'circuit' | 'activity' | 'puzzle' | 'complete'>('intro');
  const [activityCompleted, setActivityCompleted] = useState(false);
  const [circuitCompleted, setCircuitCompleted] = useState(false);
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [earnedStars, setEarnedStars] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const showSuccessFeedback = (message: string, stars: number) => {
    setFeedbackMessage(message);
    setEarnedStars(stars);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
  };

  const handleCircuitComplete = () => {
    setCircuitCompleted(true);
    showSuccessFeedback("Great job! ⚡ Circuit completed!", 3);
  };

  const handleActivityComplete = () => {
    setActivityCompleted(true);
    showSuccessFeedback("Interactive activity completed! Amazing work! 🏆", 5);
    setTimeout(() => setCurrentSection('puzzle'), 2000);
  };

  const handlePuzzleComplete = () => {
    setPuzzleCompleted(true);
    showSuccessFeedback("Puzzle Master! 🧩 All sections completed!", 7);
    setTimeout(() => setCurrentSection('complete'), 2000);
  };

  const show3DCircuit = () => {
    // Simulate 3D view popup
    alert("📱 3D Circuit View: Interactive 3D model of simple electric circuit with battery, switch, and LED would appear here! Scan the barcode with your phone camera to see the full AR experience.");
  };

  const playInstructions = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes('Female')) || speechSynthesis.getVoices()[0];
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const renderIntroSection = () => (
    <div className="text-center space-y-6">
      <div className="bg-white/90 rounded-3xl p-8 border-4 border-yellow-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-purple-800 mb-4">
          🎬 Introduction Video with Sparky!
        </h2>
        <p className="text-lg text-blue-700 mb-6">
          Meet Sparky the Robot! He'll guide you through building your first electric circuit!
        </p>
        
        <div className="relative w-full max-w-2xl mx-auto mb-6">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/S0sCbaDtJZM"
            title="Simple Electric Circuit Introduction"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg border-4 border-blue-300"
          ></iframe>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => playInstructions("Hi Sonali! I'm Sparky, and I'm here to help you learn about electric circuits. Are you ready to build something amazing together?")}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Volume2 className="mr-2 h-4 w-4" />
            🤖 Hear from Sparky!
          </Button>
          <Button
            onClick={() => setCurrentSection('circuit')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3"
          >
            <Play className="mr-2 h-5 w-5" />
            Let's Start Building! ⚡
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCircuitSection = () => (
    <div className="space-y-6">
      <div className="bg-white/90 rounded-3xl p-8 border-4 border-blue-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">
          ⚡ 2. Build Your Circuit - Interactive Lab!
        </h2>
        <p className="text-lg text-center text-blue-700 mb-6">
          🤖 Sparky says: "Drag and drop the components to complete the circuit!"
        </p>
        
        {/* PhET Simulation Embed */}
        <div className="w-full h-96 border-4 border-purple-300 rounded-lg mb-6 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <iframe
            src="https://phet.colorado.edu/sims/html/circuit-construction-kit-dc-virtual-lab/latest/circuit-construction-kit-dc-virtual-lab_en.html"
            width="100%"
            height="100%"
            className="rounded-lg"
            title="Circuit Construction Kit"
          ></iframe>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-purple-700">🎯 Your Mission:</h3>
            <ul className="space-y-2 text-purple-600">
              <li>• Connect the battery to power your circuit</li>
              <li>• Add a switch to control the flow</li>
              <li>• Connect the LED light</li>
              <li>• Close the switch to light it up!</li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4">
            <Button
              onClick={show3DCircuit}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              <QrCode className="mr-2 h-4 w-4" />
              📱 Scan for 3D View
            </Button>
            <Button
              onClick={() => playInstructions("Remember Sonali, electricity needs a complete path to flow. Connect all the parts to make a circle!")}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Volume2 className="mr-2 h-4 w-4" />
              🎵 Get a Hint
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={handleCircuitComplete}
            disabled={circuitCompleted}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 text-lg"
          >
            {circuitCompleted ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                ✅ Circuit Complete!
              </>
            ) : (
              <>
                <Star className="mr-2 h-5 w-5" />
                🔥 I Did It!
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderActivitySection = () => (
    <div className="space-y-6">
      <div className="bg-white/90 rounded-3xl p-8 border-4 border-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">
          🎮 3. Interactive Circuit Activity!
        </h2>
        <p className="text-lg text-center text-green-700 mb-6">
          🤖 Sparky says: "Test your circuit knowledge with this fun interactive activity!"
        </p>

        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border-4 border-green-300 mb-6">
          <div className="flex justify-center">
            <iframe 
              style={{maxWidth:"100%"}} 
              src="https://wordwall.net/embed/951cd9e8feb348e3a8e614734884a5af?themeId=60&templateId=38&fontStackId=0" 
              width="500" 
              height="380" 
              frameBorder="0" 
              allowFullScreen
              className="rounded-lg border-2 border-green-400"
            ></iframe>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Button
            onClick={() => playInstructions("Take your time Sonali! Think about what you learned from building the circuit.")}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Volume2 className="mr-2 h-4 w-4" />
            🤖 Sparky's Hint
          </Button>
          
          <Button
            onClick={handleActivityComplete}
            disabled={activityCompleted}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg ml-4"
          >
            {activityCompleted ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                ✅ Activity Complete!
              </>
            ) : (
              <>
                <Star className="mr-2 h-5 w-5" />
                🎯 Complete Activity!
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPuzzleSection = () => (
    <div className="space-y-6">
      <div className="bg-white/90 rounded-3xl p-8 border-4 border-red-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-red-800 mb-4 text-center">
          🧩 4. Circuit Puzzle Challenge!
        </h2>
        <p className="text-lg text-center text-red-700 mb-6">
          🤖 Sparky says: "Can you solve this tricky circuit puzzle?"
        </p>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-lg border-2 border-red-300 mb-6">
          <h3 className="text-xl font-bold text-red-700 mb-4 text-center">
            🔍 Find the Missing Connection!
          </h3>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-yellow-200 p-4 rounded text-center border-2 border-yellow-400">
              🔋 Battery
            </div>
            <div className="bg-gray-200 p-4 rounded text-center border-2 border-gray-400">
              ❓ Missing
            </div>
            <div className="bg-blue-200 p-4 rounded text-center border-2 border-blue-400">
              💡 LED
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 mt-6">
            <Button
              onClick={handlePuzzleComplete}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              🔌 Add Switch
            </Button>
            <Button className="bg-gray-400 text-white">
              🪙 Add Resistor
            </Button>
            <Button className="bg-gray-400 text-white">
              📻 Add Speaker
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={() => playInstructions("Remember, you need something to control the electricity flow!")}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            <Volume2 className="mr-2 h-4 w-4" />
            🔮 Need a Clue?
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCompleteSection = () => (
    <div className="text-center space-y-6">
      <div className="bg-white/90 rounded-3xl p-8 border-4 border-gold-400 shadow-2xl">
        <h2 className="text-4xl font-bold text-yellow-800 mb-4">
          🎉 Congratulations Sonali! 🎉
        </h2>
        <p className="text-xl text-yellow-700 mb-6">
          You've mastered Simple Electric Circuits! Sparky is so proud! 🤖✨
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-b from-blue-100 to-blue-200 border-2 border-blue-400">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <h3 className="text-lg font-bold text-blue-800">Circuit Master</h3>
              <p className="text-blue-600">Badge Earned!</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-b from-green-100 to-green-200 border-2 border-green-400">
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <h3 className="text-lg font-bold text-green-800">{earnedStars} Stars</h3>
              <p className="text-green-600">Collected!</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-b from-purple-100 to-purple-200 border-2 border-purple-400">
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <h3 className="text-lg font-bold text-purple-800">Interactive Activity</h3>
              <p className="text-purple-600">Completed!</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center space-x-4">
          <Link to="/activity/motor">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3">
              🎯 Next Activity: Motor Building!
            </Button>
          </Link>
          <Link to="/activities">
            <Button variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-3">
              📚 Back to Activities
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden">
      {/* Success Feedback Popup */}
      {showFeedback && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl p-6 shadow-2xl border-4 border-yellow-400 animate-bounce">
          <div className="text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-green-800 mb-2">{feedbackMessage}</h3>
            <div className="flex justify-center space-x-1">
              {[...Array(earnedStars)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-500 fill-current animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating animations */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce">🌟</div>
      <div className="absolute top-20 right-20 text-3xl animate-ping">⭐</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-pulse">🎈</div>

      {/* Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b-4 border-gradient-to-r from-purple-500 to-pink-500 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/uploads/6ffc8098-6922-435a-99ef-f9c11d2729c4.png" alt="TinkerAlpha" className="h-8 w-auto" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TinkerAlpha ⚡
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-blue-600 hover:text-purple-600 font-bold text-lg flex items-center">
                <Home className="mr-1 h-4 w-4" />
                Home
              </Link>
              <Link to="/subjects" className="text-blue-600 hover:text-purple-600 font-bold text-lg flex items-center">
                <BookOpen className="mr-1 h-4 w-4" />
                Subjects
              </Link>
              <Link to="/activities" className="text-purple-800 font-bold text-lg border-b-2 border-purple-400 flex items-center">
                <Target className="mr-1 h-4 w-4" />
                Activities
              </Link>
              <Link to="/dashboard" className="text-blue-600 hover:text-purple-600 font-bold text-lg flex items-center">
                <BookOpen className="mr-1 h-4 w-4" />
                Dashboard
              </Link>
              <Link to="/certificates" className="text-blue-600 hover:text-purple-600 font-bold text-lg flex items-center">
                <Award className="mr-1 h-4 w-4" />
                Certificates
              </Link>
              <Link to="/help" className="text-blue-600 hover:text-purple-600 font-bold text-lg flex items-center">
                <HelpCircle className="mr-1 h-4 w-4" />
                Help
              </Link>
            </div>
            <Link to="/cart">
              <Button className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold px-6 py-3 rounded-full">
                🛒 Cart
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">⚡ Simple Electric Circuit ⚡</h1>
          <p className="text-xl text-white/90">Join Sparky on an amazing circuit adventure, Sonali!</p>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mt-6">
            <Progress 
              value={
                currentSection === 'intro' ? 25 :
                currentSection === 'circuit' ? 50 :
                currentSection === 'activity' ? 75 :
                100
              } 
              className="h-6 bg-white/30"
            />
            <div className="flex justify-between text-white font-semibold mt-2">
              <span>🎬 Intro</span>
              <span>⚡ Circuit</span>
              <span>🎮 Activity</span>
              <span>🧩 Puzzle</span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        {currentSection === 'intro' && renderIntroSection()}
        {currentSection === 'circuit' && renderCircuitSection()}
        {currentSection === 'activity' && renderActivitySection()}
        {currentSection === 'puzzle' && renderPuzzleSection()}
        {currentSection === 'complete' && renderCompleteSection()}

        {/* Navigation Controls */}
        <div className="flex justify-center space-x-4 mt-8">
          {currentSection !== 'intro' && (
            <Button
              onClick={() => {
                if (currentSection === 'circuit') setCurrentSection('intro');
                else if (currentSection === 'activity') setCurrentSection('circuit');
                else if (currentSection === 'puzzle') setCurrentSection('activity');
              }}
              variant="outline"
              className="bg-white/90 text-blue-600 border-blue-400"
            >
              ← Previous Section
            </Button>
          )}
          
          {circuitCompleted && currentSection === 'circuit' && (
            <Button
              onClick={() => setCurrentSection('activity')}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Continue to Activity →
            </Button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Circuit;
