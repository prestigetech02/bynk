export type ContactSubmissionStatus = "new" | "read" | "archived";
export type ContactSubmissionSource = "contact" | "service";

export type ChatSessionStatus = "bot" | "waiting" | "human" | "closed";
export type ChatMessageRole = "user" | "assistant" | "agent" | "system";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  source: ContactSubmissionSource;
  service_slug: string | null;
  status: ContactSubmissionStatus;
  created_at: string;
};

export type ChatSession = {
  id: string;
  visitor_key: string;
  status: ChatSessionStatus;
  assigned_agent_id: string | null;
  last_message_at: string;
  created_at: string;
  updated_at: string;
};

export type ChatMessage = {
  id: string;
  session_id: string;
  role: ChatMessageRole;
  body: string;
  agent_id: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: ContactSubmission;
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject?: string;
          message: string;
          source?: ContactSubmissionSource;
          service_slug?: string | null;
          status?: ContactSubmissionStatus;
          created_at?: string;
        };
        Update: {
          status?: ContactSubmissionStatus;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string;
          message?: string;
          source?: ContactSubmissionSource;
          service_slug?: string | null;
        };
        Relationships: [];
      };
      chat_sessions: {
        Row: ChatSession;
        Insert: {
          id?: string;
          visitor_key: string;
          status?: ChatSessionStatus;
          assigned_agent_id?: string | null;
          last_message_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: ChatSessionStatus;
          assigned_agent_id?: string | null;
          last_message_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      chat_messages: {
        Row: ChatMessage;
        Insert: {
          id?: string;
          session_id: string;
          role: ChatMessageRole;
          body: string;
          agent_id?: string | null;
          created_at?: string;
        };
        Update: {
          body?: string;
          role?: ChatMessageRole;
          agent_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "chat_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
