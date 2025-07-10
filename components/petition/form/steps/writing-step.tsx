import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
// import TextAlign from '@tiptap/extension-text-align';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCallback, useEffect } from 'react';
import { 
    Bold, 
    Italic, 
    Underline as UnderlineIcon, 
    Strikethrough, 
    List, 
    ListOrdered, 
    Quote, 
    Link as LinkIcon, 
    Image as ImageIcon,
    Undo,
    Redo,
    Sparkles
} from 'lucide-react';

type PetitionData = {
    content: string;
};

type WritingStepProps = {
    formData: PetitionData;
    updateFormData: (updates: Partial<PetitionData>) => void;
};

export function WritingStep({ formData, updateFormData }: WritingStepProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 hover:text-blue-800 underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
            }),
        ],
        content: formData.content || '<p>Express your cause clearly, the AI helps you formulate.<br>Describe why this petition is important, what are the facts, the consequences, and the solutions you propose.</p>',
        onUpdate: ({ editor }) => {
            updateFormData({ content: editor.getHTML() });
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
            },
        },
        enableContentCheck: true,
        onContentError: ({ error }) => {
            console.error('Editor content error:', error);
        },
    });

    const addLink = useCallback(() => {
        const url = window.prompt('Enter URL');
        if (url && editor) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    }, [editor]);

    const addImage = useCallback(() => {
        const url = window.prompt('Enter image URL');
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const handleHeadingChange = useCallback((value: string) => {
        if (!editor) return;
        
        if (value === 'paragraph') {
            editor.chain().focus().setParagraph().run();
        } else if (value.startsWith('heading')) {
            const level = parseInt(value.replace('heading', '')) as 1 | 2 | 3 | 4 | 5 | 6;
            if (level >= 1 && level <= 6) {
                editor.chain().focus().toggleHeading({ level }).run();
            }
        }
    }, [editor]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (editor) {
                editor.destroy();
            }
        };
    }, [editor]);

    if (!editor) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Writing</h2>
                <p className="text-gray-600 mb-4">
                    Express your cause clearly, the AI helps you formulate.
                    <br />
                    Describe why this petition is important, what are the facts, the consequences, and the solutions you propose.
                </p>
                <p className="text-sm text-gray-500 mb-6">English</p>
            </div>

            {/* Toolbar */}
            <div className="border rounded-lg bg-white">
                <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50/50">
                    {/* Undo/Redo */}
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().undo()}
                            className="h-8 w-8 p-0 hover:bg-gray-200"
                            title="Undo"
                        >
                            <Undo className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().redo()}
                            className="h-8 w-8 p-0 hover:bg-gray-200"
                            title="Redo"
                        >
                            <Redo className="h-4 w-4" />
                        </Button>
                    </div>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    {/* Text Formatting */}
                    <select 
                        className="text-sm border rounded px-2 py-1 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => handleHeadingChange(e.target.value)}
                        value={
                            editor.isActive('heading', { level: 1 }) ? 'heading1' :
                            editor.isActive('heading', { level: 2 }) ? 'heading2' :
                            editor.isActive('heading', { level: 3 }) ? 'heading3' :
                            'paragraph'
                        }
                    >
                        <option value="paragraph">Normal</option>
                        <option value="heading1">Heading 1</option>
                        <option value="heading2">Heading 2</option>
                        <option value="heading3">Heading 3</option>
                    </select>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    {/* Basic Formatting */}
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`h-8 w-8 p-0 hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
                            title="Bold"
                        >
                            <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`h-8 w-8 p-0 hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
                            title="Italic"
                        >
                            <Italic className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={`h-8 w-8 p-0 hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
                            title="Underline"
                        >
                            <UnderlineIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={`h-8 w-8 p-0 hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
                            title="Strikethrough"
                        >
                            <Strikethrough className="h-4 w-4" />
                        </Button>
                    </div>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    {/* Media */}
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={addImage}
                            className="h-8 w-8 p-0 hover:bg-gray-200"
                            title="Add Image"
                        >
                            <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={addLink}
                            className={`h-8 w-8 p-0 hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
                            title="Add Link"
                        >
                            <LinkIcon className="h-4 w-4" />
                        </Button>
                    </div>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                   

                    <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block" />

                    {/* Lists */}
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`h-8 w-8 p-0 hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                            title="Bullet List"
                        >
                            <List className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={`h-8 w-8 p-0 hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                            title="Numbered List"
                        >
                            <ListOrdered className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={`h-8 w-8 p-0 hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
                            title="Quote"
                        >
                            <Quote className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Editor Content */}
                <div className="min-h-[300px] max-h-[500px] overflow-y-auto">
                    <EditorContent editor={editor} />
                </div>

                {/* AI Assistance Button */}
                <div className="p-3 border-t bg-gray-50/50">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                        <Sparkles className="h-4 w-4" />
                        Assistance IA
                    </Button>
                </div>
            </div>

            {/* AI Usage Warning */}
            <Alert className="bg-orange-50 border-orange-200">
                <AlertDescription className="text-orange-700">
                    ⚠️ Advice
                    <br />
                    If you are not comfortable with writing, use our assistance tool to get a clear, persuasive, and well-structured version.{' '}
                    <span className="text-red-500 font-medium">
                        You have reached 21% of your planned AI assistance usage
                    </span>
                </AlertDescription>
            </Alert>
        </div>
    );
}
