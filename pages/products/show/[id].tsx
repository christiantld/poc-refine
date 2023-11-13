import { MantineShowInferencer } from "@refinedev/inferencer/mantine";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TextField } from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading} title="Exibir Produto">
            <Title my="xs" order={5}>
                Name
            </Title>
            <TextField value={record?.name} />
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

export default ProductShow