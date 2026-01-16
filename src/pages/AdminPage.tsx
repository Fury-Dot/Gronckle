import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Updated interface to match your SQL 'submissions' table exactly
interface Submission {
  id: string;
  tool_name: string; // Changed from 'name' to match SQL
  url: string;
  description: string;
  category: string;
  tags: string[];
  github_url?: string;
  created_at: string;
  email?: string;     // Matches your column rename
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClient();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate('/login');
      return;
    }

    // Checking the 'users' table and 'role' column from your database
    const { data: userRecord, error } = await supabase
      .from('users') 
      .select('role')
      .eq('id', user.id)
      .single();

    if (error || userRecord?.role !== 'admin') {
      console.error("Access denied or user not found:", error);
      toast.error("You do not have permission to view this page.");
      navigate('/');
      return;
    }

    setIsAdmin(true);
    fetchSubmissions();
  };

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('status', 'pending') // Only show tools waiting for review
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to load submissions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (submission: Submission) => {
    try {
      // 1. Insert into gems table using correct column names
      const { error: insertError } = await supabase
        .from('gems')
        .insert([{
          name: submission.tool_name, // Mapping 'tool_name' to 'name' in gems
          url: submission.url,
          description: submission.description,
          category: submission.category,
          tags: submission.tags,
          github_url: submission.github_url,
          featured: false,
          likes: 0,
          views: 0,
        }]);

      if (insertError) throw insertError;

      // 2. Update status in submissions table
      const { error: updateError } = await supabase
        .from('submissions')
        .update({ status: 'approved' })
        .eq('id', submission.id);

      if (updateError) throw updateError;

      // Refresh list
      await fetchSubmissions();
      toast.success('Gem approved and published live!');
    } catch (error) {
      console.error('Error approving submission:', error);
      toast.error('Failed to approve submission');
    }
  };

  const handleReject = async (id: string) => {
    try {
      // Update status to rejected rather than deleting
      const { error } = await supabase
        .from('submissions')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;

      setSubmissions(submissions.filter(sub => sub.id !== id));
      toast.success('Submission rejected');
    } catch (error) {
      console.error('Error rejecting submission:', error);
      toast.error('Failed to reject submission');
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Verifying Access...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage pending tool submissions</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-slate-200">
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending submissions to review.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tool Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{submission.tool_name}</span>
                          <a 
                            href={submission.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            View Website
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{submission.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {submission.email || "Anonymous"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleReject(submission.id)}
                        >
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => handleApprove(submission)}
                        >
                          Approve
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}