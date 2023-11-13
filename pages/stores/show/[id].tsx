import { MantineShowInferencer } from "@refinedev/inferencer/mantine";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import { Show, TextField } from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const StoreShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: distributorData, isLoading: distributorIsLoading } = useOne({
        resource: "distributors",
        id: record?.distributorId || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading} title={`Loja ${record?.name}`}>
            <Title my="xs" order={5}>
                Distributor
            </Title>
            {distributorIsLoading ? (
                <>Loading...</>
            ) : (
                <>{distributorData?.data?.name}</>
            )}
        </Show>
    );
};


export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/blog-posts")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default StoreShow;