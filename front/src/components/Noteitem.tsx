import React, { useState, useEffect, useRef } from 'react';
import { Note } from '../types/note';
import { useNotes } from '../contexts/NotesContex';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash, Save, X, Share2, Download, ChevronDown } from 'lucide-react';
import QRCode from 'qrcode';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as docx from 'docx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { updateNote, deleteNote } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [showQR, setShowQR] = useState(false);
  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  const handleSave = () => {
    updateNote(note.id, { title: editedTitle, content: editedContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteNote(note.id);
  };

  const handleExport = (format: 'txt' | 'json' | 'pdf' | 'docx') => {
    switch (format) {
      case 'txt':
        exportTxt();
        break;
      case 'json':
        exportJson();
        break;
      case 'pdf':
        exportPdf();
        break;
      case 'docx':
        exportDocx();
        break;
    }
  };

  const exportTxt = () => {
    const content = `${note.title}\n\n${note.content}`;
    const blob = new Blob([content], { type: 'text/plain' });
    saveAs(blob, `${note.title}.txt`);
  };

  const exportJson = () => {
    const content = JSON.stringify(note, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    saveAs(blob, `${note.title}.json`);
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.text(note.title, 10, 10);
    doc.text(note.content, 10, 20);
    doc.save(`${note.title}.pdf`);
  };

  const exportDocx = () => {
    const doc = new docx.Document({
      sections: [{
        properties: {},
        children: [
          new docx.Paragraph({
            children: [new docx.TextRun(note.title)],
            heading: docx.HeadingLevel.HEADING_1,
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(note.content)],
          }),
        ],
      }],
    });

    docx.Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${note.title}.docx`);
    });
  };

  const toggleQR = () => {
    setShowQR(!showQR);
  };

  useEffect(() => {
    if (showQR && qrCodeRef.current) {
      QRCode.toCanvas(qrCodeRef.current, `${window.location.origin}/note/${note.id}`, { width: 128 }, (error) => {
        if (error) console.error('Error generating QR code', error);
      });
    }
  }, [showQR, note.id]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {isEditing ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-xl font-bold"
            />
          ) : (
            note.title
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[100px]"
          />
        ) : (
          <p>{note.content}</p>
        )}
        {showQR && (
          <div className="mt-4 flex justify-center">
            <canvas ref={qrCodeRef} />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="mr-2">
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)} className="mr-2">
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button onClick={handleDelete} variant="destructive">
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </>
          )}
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mr-2">
                <Download className="mr-2 h-4 w-4" /> Export <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => handleExport('txt')}>
                TXT
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleExport('json')}>
                JSON
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleExport('pdf')}>
                PDF
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleExport('docx')}>
                DOCX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={toggleQR} variant="outline">
            <Share2 className="mr-2 h-4 w-4" /> {showQR ? 'Hide QR' : 'Share'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NoteItem;

