import { MantineShowInferencer } from "@refinedev/inferencer/mantine";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import { Show, TextField, NumberField, DateField } from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const SalesShow: React.FC<IResourceComponentsProps> = () => {
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

    const { data: storeUserData, isLoading: storeUserIsLoading } = useOne({
        resource: "store_users",
        id: record?.store_userId || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    const { data: productData, isLoading: productIsLoading } = useOne({
        resource: "products",
        id: record?.product || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading} title="Detalhes da venda">
  
            <Title my="xs" order={5}>
                Loja
            </Title>
            {storeIsLoading ? <>Loading...</> : <>{storeData?.data?.name}</>}
            <Title my="xs" order={5}>
                Vendedor
            </Title>
            {storeUserIsLoading ? (
                <>Loading...</>
            ) : (
                <>{storeUserData?.data?.name}</>
            )}
            <Title my="xs" order={5}>
                Valor
            </Title>
            <NumberField value={record?.value ?? ""} />
            <Title my="xs" order={5}>
                Date
            </Title>
            <DateField value={record?.date} />
            <Title my="xs" order={5}>
                Produto
            </Title>
            {productIsLoading ? (
                <>Loading...</>
            ) : (
                <>{productData?.data?.name}</>
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
        destination: `${redirectTo}?to=${encodeURIComponent("/")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SalesShow