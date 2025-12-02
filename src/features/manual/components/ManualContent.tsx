'use client';

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/src/components/ui/button";
import {Card} from "@/src/components/ui/card";
import {Download, Copy, Check, Terminal, FileJson, Apple, Smartphone} from "lucide-react";
import {motion} from "framer-motion";

// Componente simple para bloques de código
const CodeBlock = ({title, code, language = "bash"}: { title: string, code: string, language?: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl border border-slate-200 overflow-hidden my-6 shadow-sm bg-slate-900">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                <span className="text-xs font-mono text-slate-400">{title}</span>
                <button
                    onClick={handleCopy}
                    className="text-slate-400 hover:text-white transition-colors"
                >
                    {copied ? <Check className="h-3.5 w-3.5"/> : <Copy className="h-3.5 w-3.5"/>}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-slate-300">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
};

export const ManualContent = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    // Protección de ruta igual que en el dashboard
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            router.push('/login');
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) return null;

    return (
        <div className="container mx-auto max-w-5xl px-6 py-12">

            {/* Header y Descarga */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Guía de Integración</h1>
                    <p className="text-slate-500 mt-2 text-lg">Documentación oficial para implementar Emotion AI SDK
                        v1.0.0+1</p>
                </div>

                <Card className="p-1 bg-white border-indigo-100 shadow-lg shadow-indigo-500/10">
                    <Button
                        onClick={() => window.open('/packages/sentiment_analyzer.zip', '_blank')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-6 text-base shadow-none"
                    >
                        <Download className="mr-2 h-5 w-5"/>
                        Descargar SDK (.zip)
                    </Button>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

                {/* Navegación Lateral (Sticky) */}
                <aside className="hidden lg:block lg:col-span-1">
                    <nav className="sticky top-24 space-y-1">
                        <p className="px-3 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Índice</p>
                        {[
                            {label: "Instalación", href: "#instalacion"},
                            {label: "Configuración Android", href: "#android"},
                            {label: "Configuración iOS", href: "#ios"},
                            {label: "Integración Básica", href: "#integracion"},
                            {label: "Permisos", href: "#permisos"}
                        ].map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* Contenido Principal */}
                <div className="lg:col-span-3 space-y-16">

                    {/* Sección Instalación */}
                    <section id="instalacion" className="scroll-mt-28">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-slate-100 rounded-lg text-slate-700"><Terminal className="h-6 w-6"/>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">1. Instalación</h2>
                        </div>
                        <p className="text-slate-600 mb-4">
                            Descomprime el archivo descargado en la carpeta <code>packages/</code> de tu proyecto
                            Flutter y agrega las dependencias en tu <code>pubspec.yaml</code>.
                        </p>
                        <CodeBlock
                            title="pubspec.yaml"
                            language="yaml"
                            code={`dependencies:
  sentiment_analyzer:
    path: ./packages/sentiment_analyzer
    
  # Dependencias peer requeridas
  camera: ^0.11.0
  provider: ^6.1.5
  shared_preferences: ^2.2.0
  vibration: ^3.1.0`}
                        />
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <p className="text-sm text-amber-800">
                                <strong>Importante:</strong> Asegúrate de ejecutar <code>flutter pub get</code> después
                                de guardar los cambios.
                            </p>
                        </div>
                    </section>

                    {/* Sección Android */}
                    <section id="android" className="scroll-mt-28">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-100 rounded-lg text-green-700"><Smartphone
                                className="h-6 w-6"/></div>
                            <h2 className="text-2xl font-bold text-slate-900">2. Configuración Android</h2>
                        </div>

                        <h3 className="text-lg font-semibold text-slate-800 mb-3">build.gradle</h3>
                        <p className="text-slate-600 mb-2">Asegúrate de que el <code>minSdkVersion</code> sea al menos
                            21.</p>
                        <CodeBlock
                            title="android/app/build.gradle"
                            language="gradle"
                            code={`android {
    compileSdkVersion 34
    
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 34
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}`}
                        />

                        <h3 className="text-lg font-semibold text-slate-800 mb-3 mt-8">AndroidManifest.xml</h3>
                        <p className="text-slate-600 mb-2">Agrega los permisos de cámara y la metadata de ML Kit.</p>
                        <CodeBlock
                            title="android/app/src/main/AndroidManifest.xml"
                            language="xml"
                            code={`<manifest ...>
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.VIBRATE" />
    
    <uses-feature android:name="android.hardware.camera.front" android:required="false" />
    
    <application>
        <meta-data
            android:name="com.google.mlkit.vision.DEPENDENCIES"
            android:value="face_mesh" />
    </application>
</manifest>`}
                        />
                    </section>

                    {/* Sección iOS */}
                    <section id="ios" className="scroll-mt-28">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-slate-100 rounded-lg text-slate-900"><Apple className="h-6 w-6"/>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">3. Configuración iOS</h2>
                        </div>

                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Info.plist</h3>
                        <p className="text-slate-600 mb-2">Es obligatorio describir por qué se usa la cámara para
                            cumplir con las políticas de Apple.</p>
                        <CodeBlock
                            title="ios/Runner/Info.plist"
                            language="xml"
                            code={`<dict>
    <key>NSCameraUsageDescription</key>
    <string>Esta aplicación utiliza la cámara para analizar estados cognitivos durante el aprendizaje.</string>
    
    <key>NSMicrophoneUsageDescription</key>
    <string>Requerido por la librería de cámara, aunque no grabamos audio.</string>
</dict>`}
                        />
                    </section>

                    {/* Sección Integración */}
                    <section id="integracion" className="scroll-mt-28">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700"><FileJson
                                className="h-6 w-6"/></div>
                            <h2 className="text-2xl font-bold text-slate-900">4. Integración en tu Código</h2>
                        </div>

                        <p className="text-slate-600 mb-6">
                            Envuelve tu vista principal con un <code>Stack</code> e inicializa
                            el <code>SessionManager</code>.
                        </p>

                        <CodeBlock
                            title="lib/main.dart"
                            language="dart"
                            code={`class _MyActivityState extends State<MyActivity> {
  late final SessionManager _sessionManager;

  @override
  void initState() {
    super.initState();
    // 1. Inicializar el Manager
    _sessionManager = SessionManager(
      network: MyNetworkService(), 
      userId: 12345,
      disabilityType: 'TDAH',
    );
    
    _startMonitoring();
  }

  Future<void> _startMonitoring() async {
    await _sessionManager.initializeSession();
    // 2. Iniciar una actividad (Esto activa la cámara)
    await _sessionManager.startActivity(
      externalActivityId: 501,
      title: 'Matemáticas Básicas',
      activityType: 'EXERCISE',
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Tu contenido normal va aquí
          MyExistingContent(),
          
          // El Overlay de Emotion AI va encima
          if (_sessionManager.hasActiveSession)
            SentimentAnalysisManager(
              sessionManager: _sessionManager,
              externalActivityId: '501',
              gatewayUrl: 'https://api.tu-backend.com',
              apiKey: 'TU_API_KEY_AQUI',
              onStateChanged: (state) => print("Estado: \${state.finalState}"),
            ),
        ],
      ),
    );
  }
}`}
                        />
                    </section>

                </div>
            </div>
        </div>
    );
};