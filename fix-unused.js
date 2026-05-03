const fs = require('fs');

function replaceFileContent(file, replacer) {
  const content = fs.readFileSync(file, 'utf8');
  const newContent = replacer(content);
  if (newContent !== content) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${file}`);
  }
}

replaceFileContent('src/app/api/gemini/route.ts', c => c.replace(/catch \(e\)/g, 'catch (error)'));
replaceFileContent('src/app/dashboard/AnalyticsClient.tsx', c => c.replace(/const allianceColors =.*?};/s, ''));
replaceFileContent('src/app/learn/page.tsx', c => c.replace('const [profile, setProfile] = useState<any>(null);', ''));
replaceFileContent('src/app/map/page.tsx', c => {
  let text = c.replace('useMemo, ', '');
  text = text.replace('const [map, setMap] = useState<google.maps.Map | null>(null);', '');
  text = text.replace('onLoad={(m) => setMap(m)}', 'onLoad={() => {}}');
  return text;
});
replaceFileContent('src/app/quiz/page.tsx', c => {
  let text = c.replace('import { candidateInfos } from "@/lib/election-data";', '');
  text = text.replace('const [isMatching, setIsMatching] = useState(false);', '');
  return text;
});
replaceFileContent('src/app/truth/page.tsx', c => c.replace('const scannerRef = useRef<HTMLDivElement>(null);', ''));
replaceFileContent('src/components/ElectionLiveStream.tsx', c => c.replace('import { motion } from "framer-motion";\n', ''));
replaceFileContent('src/components/FirebaseSetupGuide.tsx', c => c.replace('import { motion } from "framer-motion";\n', ''));
replaceFileContent('src/components/LeafletFallbackMap.tsx', c => c.replace('import { motion, AnimatePresence } from "framer-motion";\n', ''));
replaceFileContent('src/components/NotificationHub.tsx', c => {
  let text = c.replace('auth, ', '');
  text = text.replace(', where', '');
  return text;
});
replaceFileContent('src/components/SaathiChat.tsx', c => c.replace('const audioContextRef = useRef<AudioContext | null>(null);', ''));
