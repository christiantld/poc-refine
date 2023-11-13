import { MantineShowInferencer } from "@refinedev/inferencer/mantine";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import { Show, TextField } from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const UserShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: storeData, isLoading: storeIsLoading } = useOne({
        resource: "stores",
        id: record?.storeId || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title my="xs" order={5}>
                Nome
            </Title>
            <TextField value={record?.name} />
            <Title my="xs" order={5}>
                Loja
            </Title>
            {storeIsLoading ? <>Loading...</> : <>{storeData?.data?.name}</>}
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

export default UserShow