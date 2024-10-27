import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import RoomDataRow from '../../../components/Dshboard/tableRow/RoomdataRow';

const MyListings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient(); // Create a query client instance

  // Fetching data of my listings
  const { data: rooms = [], isLoading, error, refetch } = useQuery({
    queryKey: ['rooms', user?.email], // Assign a proper query key
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-listings/${user?.email}`); // Fetch listings by user email
      return data;
    },
  });

  // Delete mutation query
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/room/${id}`); // Delete room by id
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms', user?.email]); // Invalidate 'rooms' query to trigger refetch
    },
    onError: (error) => {
      console.error('Error deleting room:', error); // Handle error
    },
  });

  // Deleting data of my listings
  const handleDelete = async (id) => {
    console.log('Deleting room with ID:', id);
    await deleteMutation.mutateAsync(id); // Call the mutation and wait for its completion
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <>
      <Helmet>
        <title>My Listings</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Title</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Location</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Price</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">From</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">To</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Delete</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Room row data */}
                  {rooms?.map((room) => (
                    <RoomDataRow key={room._id} room={room} refetch={refetch} handleDelete={handleDelete} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyListings;
